import graphene
from app.api._models.userModel import User as UserModel
from app.api._models.userModel import ACCESS
from .object import UserObject
from app.api.auth.access_manager import accessRestrict

class AddUserMutation(graphene.Mutation):
    class Arguments:
        fullname = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        confirmPwd = graphene.String(required=True)
        accesslevel = graphene.String(required=True)

    ok = graphene.Boolean()
    error = graphene.String()
    user = graphene.Field(lambda: UserObject)

    @accessRestrict(access_level=ACCESS['superuser'])
    def mutate(self, info, fullname, username, password, accesslevel, confirmPwd):
        exist_user = UserModel.query.filter_by(username=username).first()
        if not exist_user:
            new_user = UserModel(
              fullname=fullname, 
              username=username, 
              password=password, 
              accesslevel=accesslevel
            )
            UserModel.save(new_user)

            return AddUserMutation(user=new_user, ok=True, error="")
        else:
            error = "当前用户名已经存在!"
            ok = False
            return AddUserMutation(ok=ok, error=error)

class UpdatePassword(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        currPassword = graphene.String(required=True)
        newPassword = graphene.String(required=True)
        confirmedPwd = graphene.String(required=True)

    ok = graphene.Boolean()
    error = graphene.String()
    user = graphene.Field(lambda: UserObject)

    @classmethod
    @accessRestrict(access_level=ACCESS['user'])
    def mutate(cls, root, info, username, currPassword, newPassword, confirmedPwd ):
        update_user = UserModel.query.filter_by(username=username).first()
        if update_user:
            hashedPwd = update_user.password
            if UserModel.pwd_is_valid(hashedPwd, currPassword):
                update_user.password = UserModel.hashed_pwd(newPassword)

                UserModel.commit()
                updateUser=update_user
                return cls(ok=True, error="", user=updateUser)
            else:
                error = "旧密码输入错误！"
                ok=False
                return cls(ok=ok, error=error)
        else:
            error = "当前用户名不存在！"
            return cls(ok=False, error=error)


class ResetPassword(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        initPassword = graphene.String(required=True)

    ok = graphene.Boolean()
    error = graphene.String()
    user = graphene.Field(lambda: UserObject)

    @classmethod
    @accessRestrict(access_level=ACCESS['superuser'])
    def mutate(cls, root, info, username, initPassword, **kwargs):
        reset_user = UserModel.query.filter_by(username=username).first()
        if reset_user:
            reset_user.password = UserModel.hashed_pwd(initPassword)

            UserModel.commit()
            resetUser = reset_user
            return cls(ok=True, error="", user=resetUser)
        else:
            error = "当前用户名不存在！"
            return cls(ok=False, error=error)

class UpdateUserFullname(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        newFullname = graphene.String(required=True)

    ok = graphene.Boolean()
    error = graphene.String()
    user = graphene.Field(lambda: UserObject)

    @classmethod
    @accessRestrict(access_level=ACCESS['user'])
    def mutate(cls, root, info, username, **kwargs):
        update_user = UserModel.query.filter_by(username=username).first()
        if update_user:
            update_user.fullname = kwargs['newFullname']

            UserModel.commit()
            updateUser = update_user
            return cls(ok=True, error="", user=updateUser)
        else:
            error = "当前用户名不存在！"
            return cls(ok=False, error=error)

class UpdateUsername(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        newUsername = graphene.String()

    ok = graphene.Boolean()
    error = graphene.String()
    user = graphene.Field(lambda: UserObject)

    @classmethod
    @accessRestrict(access_level=ACCESS['superuser'])
    def mutate(cls, root, info, username, **kwargs):
        update_user = UserModel.query.filter_by(username=username).first()
        if update_user:
            update_user.username = kwargs['newUsername']

            UserModel.commit()
            ok = True
            updateUser=update_user
            return cls(ok=ok, error="", user=updateUser)
        else:
            error = "当前用户名不存在！"
            return cls(ok=False, error=error)

class UpdateUserAccess(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        newAccessLevel = graphene.String()

    ok = graphene.Boolean()
    error = graphene.String()
    user = graphene.Field(lambda: UserObject)

    @classmethod
    @accessRestrict(access_level=ACCESS['superuser'])
    def mutate(cls, root, info, username, **kwargs):
        update_user = UserModel.query.filter_by(username=username).first()
        if update_user:
            update_user.accesslevel = kwargs['newAccessLevel']

            UserModel.commit()
            ok = True
            updateUser=update_user
            return cls(ok=ok, error="", user=updateUser)
        else:
            error = "当前用户名不存在！"
            return cls(ok=False, error=error)

class DeleteUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)

    ok = graphene.Boolean()
    user = graphene.Field(lambda: UserObject)

    @classmethod
    @accessRestrict(access_level=ACCESS['superuser'])
    def mutate(cls, root, info, username):
        delete_user = UserModel.query.filter_by(username=username).first()
        if delete_user:
            UserModel.delete(delete_user)
            return cls(user=delete_user, ok=True)

class Mutation(graphene.ObjectType):
    mutate_add_user = AddUserMutation.Field()
    delete_user = DeleteUserMutation.Field()
    update_user_password = UpdatePassword.Field()
    reset_user_password = ResetPassword.Field()
    update_user_fullname = UpdateUserFullname.Field()
    update_username = UpdateUsername.Field()
    update_user_access = UpdateUserAccess.Field()


