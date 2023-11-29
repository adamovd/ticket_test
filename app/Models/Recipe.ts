// import { Timestamp } from "mongodb";
// import mongoose from "mongoose";

type Ingredient = string;
type Value = number;
type Unit = string;

export type Recipe = {
  countryId: string;
  name: string;
  description: string;
  ingredients: [{ ingredient: Ingredient; value: Value; unit: Unit }];
  instructions: string;
  imageUrls: [string];
};

// interface RecipeDoc extends mongoose.Document {
//   countryId: string;
//   name: string;
//   description: string;
//   ingredients: [{ ingredient: Ingredient; value: Value; unit: Unit }];
//   instructions: string;
//   imageUrls: [string];
// }

// interface RecipeModelInterface extends mongoose.Model<RecipeDoc> {
//   build(attr: Recipe): RecipeDoc;
// }

// const recipeSchema = new mongoose.Schema({
//   countryId: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   ingredients: [
//     {
//       ingredient: String,
//       required: true,
//     },
//     {
//       value: String,
//       required: true,
//     },
//     {
//       unit: String,
//       required: true,
//     },
//   ],
//   instructions: {
//     type: String,
//     required: false,
//   },
//   imageUrls: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
// });

// const Recipe = mongoose.model<RecipeDoc, RecipeModelInterface>(
//   "Recipe",
//   recipeSchema
// );

// recipeSchema.statics.build = (attr: Recipe) => {
//   return new Recipe(attr);
// };

// export { Recipe };
