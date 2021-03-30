import { NextApiResponse } from "next";
import { IRequest } from "types/IRequest";
import useAuth from "@hooks/useAuth";
import { errorObj } from "@lib/utils";
import "@lib/database";
import CategoryModel from "@models/Category.model";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    await useAuth(req, res);
  } catch (e) {
    return res.json({
      error: e,
      status: "error",
    });
  }

  switch (method) {
    case "GET": {
      try {
        const categories = await CategoryModel.find({ user_id: req.userId });

        return res.json({
          categories,
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.status(500).json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }
    }
    case "POST": {
      try {
        const { name } = req.body;

        if (!name) {
          return res.status(400).json({
            status: "error",
            error: "Please fill in all fields",
          });
        }

        if (name.length > 20) {
          return res.status(400).json(errorObj("Category name has a limit of 20 characters."));
        }

        const category = new CategoryModel({
          user_id: req.userId,
          name,
        });

        await category.save();

        const categories = await CategoryModel.find({ user_id: req.userId });

        return res.json({
          categories,
          status: "success",
        });
      } catch (e) {
        console.error(e);

        return res.status(500).json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }
    }
    default: {
      return res.status(405).json({
        msg: "Method not allowed",
        error: true,
      });
    }
  }
}
