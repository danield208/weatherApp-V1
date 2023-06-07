import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GoogleMapsApiService {
  apiKey: string = "AIzaSyAyJrRpDMXMHjm3nAIJS7x02D2nPT9E9Kk";

  constructor(private http: HttpClient) {}

  googleFindPlace(location: string): Observable<any> {
    return this.http.get(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
        location +
        "&inputtype=textquery&fields=photos,name&key=" +
        this.apiKey
    );
  }

  googleGetPicture(photoReference: string): Observable<any> {
    return this.http.get(
      "https://maps.googleapis.com/maps/api/place/photo" +
        "?maxwidth=1920&maxheight=1080" +
        "&photo_reference=" +
        photoReference +
        "&key=" +
        this.apiKey,
      { responseType: "blob" }
    );
  }
}

// responseType: "blob"
