import { BehaviorSubject } from "rxjs";

export class APIDataService {
	// data from api
	locationData!: any;
	userCitiesData: Array<any> = [];

	// data from server
	username!: string;
	userEmail!: string;
	userCities: Array<string> = [];

	// check if user data is loaded
	DataLoadedAndAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor() {}
}
