
def errorRemark(code=400, message=""):
    print('Error code: ', code)
    print('Error message: ', message)
    return {"isSuccess": False, "code": code, "message": message}

def syntaxError():
    return {'isSuccess': False, 'code': 1064, 'message': 'You have an error in your input syntax!'}

switcher = {
  1064: syntaxError,
}

def mutateErrorMessage(code, message):
    switch = switcher.get(code)
    #print(switch)
    if not switch is None:
        #switcher.get(code)()
        return switch()
    else:
        return errorRemark(code, message)
    #return switcher.get(code)()



