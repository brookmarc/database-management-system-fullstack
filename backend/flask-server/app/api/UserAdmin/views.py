from flask import Blueprint
from flask_graphql import GraphQLView
from .schema import schema

bp_userAdmin = Blueprint('userAdmin', __name__,)

bp_userAdmin.add_url_rule(
  '/user-admin',
  view_func = GraphQLView.as_view(
    'graphql',
    schema = schema,
    #graphiql = True                              
    graphiql = False                              
  )
)
