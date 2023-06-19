import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GoogleMapsApiService {
  constructor(private http: HttpClient) {}

  googlePlaces(locationname: string): Observable<Blob> {
    let header: HttpHeaders = new HttpHeaders().set(
      "locationname",
      locationname
    );
    header.set("mode", "no-cors");
    return this.http.get("http://localhost:3000/googleplaces/placeInfo", {
      headers: header,
      responseType: "blob",
    });
  }

  createImageFromBlob(image: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      if (image === undefined) reject(true);
      const reader: FileReader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          resolve(reader.result);
        },
        false
      );

      reader.readAsDataURL(image);
    });
  }
}
