/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { TempData } from "./TempData";

export type DataType = "tempData"; // Add data types as the get used. Next will be "soilMoisture"

export interface RecordKeeperProperties {
  docID: string;
  collection: string;
  recordDate: string; // Date().toDateString();
  createdAt: number; // unix
  updatedAt: any; // firestore.FieldValue.serverTimestamp()
  tempData: TempData[];

}
