import { PointData } from '../../Adapters/Output/PointsDBStorageAdapter';

export interface PointsDBStorageOutputPort {
	savePointOnDb(pointsDTO: PointData): Promise<string>;
	getPointOnDb(clientId: number): Promise<PointData>;
	deletePointsOnDb(clientId: number, pointsToDelete: number): Promise<string>;
}
