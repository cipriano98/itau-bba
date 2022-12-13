import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pole } from "../model/pole.model";
import { Address } from "../model/address.model";

@Injectable({
  providedIn: "root",
})
export class PoleService {
  constructor(private readonly http: HttpClient) {}

  private readonly api: string = "https://antlia-mockapi.azurewebsites.net/api";
  private readonly url: string = `${this.api}/v1/itau_teste`;
  private readonly viaCep = (zip: string): string => {
    zip = zip.replace("-", "");
    return `https://viacep.com.br/ws/${zip}/json/`;
  };

  public getPoles(): Observable<Pole[]> {
    return this.http.get<Pole[]>(this.url);
  }

  public getPole(id: number): Observable<Pole> {
    return this.http.get<Pole>(`${this.url}/${id}`);
  }

  public getZip(zip: string): Observable<Address> {
    return this.http.get<Address>(this.viaCep(zip), {
      headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*"),
    });
  }
}
