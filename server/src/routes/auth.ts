router.post("/pin", useAuth, async (req: IRequest, res: Response) => {
  const { pin } = req.body;

  if (!pin) {
    return res.json(errorObj("PIN code is required"));
  }

  await User.findByIdAndUpdate(req.user?._id, {
    pin_code: hashSync(pin, 10),
  });
});

router.post("/set-pin", useAuth, async (req: IRequest, res: Response) => {
  const { pin } = req.body;

  if (!pin) {
    return res.json(errorObj("PIN code is required"));
  }

  await User.findByIdAndUpdate(req.user?.id, { pin_code: hashSync(pin, 10) });

  res.json({
    status: "success",
  });
});

export default router;
