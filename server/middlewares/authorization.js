// authorizationMiddleware

const authorizationMiddleware = (req, res, next) => {
    // Check if the user is authenticated (you can use session, JWT, or any other authentication method)
    const isAuthenticated = req.user && req.user.isAuthenticated
  
    // Check if the user has the necessary permissions to perform the update
    const hasPermission = req.user && req.user.role === 'admin'// Example: Check if the user has admin role
  
    if (isAuthenticated && hasPermission) {
      // User is authenticated and has permission, proceed with the update
      next()
    } else {
      // User is not authenticated or lacks the required permission, block the update
      res.status(403).json({ error: 'Unauthorized' })
    }
  }
  
  module.exports = authorizationMiddleware