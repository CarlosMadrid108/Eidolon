export const handlePolicies = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      const userRole = req.session.user.role;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'User not authorized' });
      }
  
      next();
    };
  };
  
  export const onlyGuests = (req, res, next) => {
    if (req.session.user) {
      return res.status(403).json({ message: 'This endpoint is only accessible to guests' });
    }
    next();
  };