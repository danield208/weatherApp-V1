export class WeatherdataModel {
  coords: string;
  condition: { icon: string; text: string; code: number } = {
    icon: "",
    text: "",
    code: 0,
  };
  feelslike_c: string;
  humidity: string;
  last_updated_epoch: number;
  temp_c: number;
  uv: number;
  wind_dir: string;
  wind_kph: number;
  location: {
    country: string;
    lat: number;
    lon: number;
    localtime: any;
    name: string;
    region: string;
    tz_id: string;
  } = {
    country: "",
    lat: 0,
    lon: 0,
    localtime: 0,
    name: "",
    region: "",
    tz_id: "",
  };
  forecastday: Array<any> = [];
  yesterday: { forecast: any; location: any };
  locationImg!: string;

  constructor(obj?: any) {
    this.coords = obj ? obj.location.lat + "," + obj.location.lon : "";
    this.condition.icon = obj ? obj.current.condition.icon : "";
    this.condition.text = obj ? obj.current.condition.text : "";
    this.condition.code = obj ? obj.current.condition.code : 0;
    this.feelslike_c = obj ? obj.current.feelslike_c : "";
    this.humidity = obj ? obj.current.humidity : "";
    this.last_updated_epoch = obj ? obj.current.last_updated_epoch : "";
    this.temp_c = obj ? obj.current.temp_c : "";
    this.uv = obj ? obj.current.uv : "";
    this.wind_dir = obj ? obj.current.wind_dir : "";
    this.wind_kph = obj ? obj.current.wind_kph : "";
    this.location.country = obj ? obj.location.country : "";
    this.location.lat = obj ? obj.location.lat : "";
    this.location.lon = obj ? obj.location.lon : "";
    this.location.localtime = obj ? obj.location.localtime_epoch : 0;
    this.location.name = obj ? obj.location.name : "";
    this.location.region = obj ? obj.location.region : "";
    this.location.tz_id = obj ? obj.location.tz_id : "";
    this.forecastday = obj ? obj.forecast.forecastday : [];
    this.yesterday = obj ? obj.yesterday : {};
  }
}
