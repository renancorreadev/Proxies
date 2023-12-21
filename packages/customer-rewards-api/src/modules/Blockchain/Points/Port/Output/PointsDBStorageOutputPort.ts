import { PointData } from '../../Adapters/Output/PointsDBStorageAdapter';

export interface PointsDBStorageOutputPort {
	addPointsOnDb(clientId: number, pointsToAdd: number): Promise<string>;
	deletePointsOnDb(clientId: number, pointsToDelete: number): Promise<string>;
	getPointOnDb(clientId: number): Promise<PointData>;
}
