import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField
from .object import UserObject
from app.api._models.userModel import User as UserModel
from app.api._models.userModel import ACCESS
from app.api.auth.access_manager import accessRestrict

class Query(graphene.ObjectType):
    node = relay.Node.Field()
    users = graphene.List(lambda: UserObject, )

    @accessRestrict(access_level=ACCESS['superuser'])
    def resolve_users(self, info):
        query = UserObject.get_query(info)
        #print('resolve_users: ')
        #print(query)
        return query.all()


