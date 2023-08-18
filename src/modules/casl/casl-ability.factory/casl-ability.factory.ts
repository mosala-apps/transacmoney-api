import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { User } from "~/modules/auth/user/entities/user.entity";
import { Transactions } from "~/modules/transaction/entities/transaction.entity";
import { Action } from "../actions";
import { Injectable } from "@nestjs/common";
import { UserRoleEnum } from "~/enums/role-role.enum";

type Subjects = InferSubjects<typeof Transactions > | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === UserRoleEnum['SUPER_ADMIN']) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else if (user.role == UserRoleEnum['ADMIN']) {
      can(Action.Read, 'all')
      can(Action.Update, 'all')
      can(Action.Delete, 'all')
    }
    else if ((user.role == UserRoleEnum['AGENCY']) || (user.role == UserRoleEnum['SUB_AGENCY'])) {
      can(Action.Read, 'all');
      can(Action.Create, 'all')
    }else {
      can(Action.Read, 'all')
      cannot(Action.Update, 'all')
      cannot(Action.Delete, 'all')
      cannot(Action.Create, 'all')
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}