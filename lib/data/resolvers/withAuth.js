const withAuth = resolver => (...customArgs) => (...args) => {
  const config = customArgs[0]
  const context = args[2]
  if (config.auth && context && !context.user) {
    throw new Error('You are not authenticated!')
  }

  return resolver(...customArgs)(...args)
}

export default withAuth;
