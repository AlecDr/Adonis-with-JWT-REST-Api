"use strict";

const Helpers = use("Helpers");

class ImageController {
  async store({ request, response, auth, params }) {
    try {
      const property = await auth.user
        .properties()
        .where("id", params.id)
        .first();

      if (!property) {
        return response.status(400).send({ message: "Property not found!" });
      } else {
        const images = request.file("image", {
          types: ["image"],
          size: "10mb"
        });

        await images.moveAll(Helpers.tmpPath("uploads"), file => {
          return {
            ...file,
            name: `${Date.now()}-${file.clientName}`
          };
        });

        if (!images.movedAll()) {
          return response
            .status(500)
            .send({ message: "The images could not be saved!" });
        } else {
          await Promise.all(
            images
              .movedList()
              .map(image => property.images().create({ path: image.fileName }))
          );

          return { message: "Images stored!" };
        }
      }
    } catch (error) {
      console.log(error);
      return response.status(500).send({ message: "Something went wrong!" });
    }
  }

  show({ params, response }) {
    const path = params.path;
    return response.download(Helpers.tmpPath(`/uploads/${path}`));
  }
}

module.exports = ImageController;
