export const errorMiddleware = (error, req, res, next) => {
    res.status(500).json({ message: "Server fehler" });
    /* res.sendStatus(500) */
  };
  
  /* error kann auch manchmal payload bennant werden */
  