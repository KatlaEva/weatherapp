interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Clouds {
    all: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface Snow {
    '3h': number;
  }
  
  interface Sys {
    pod: string;
  }
  
  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  export interface ListItem {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    snow?: Snow;
    sys: Sys;
    dt_txt: string;
    city: City;
  }
  
  interface Coord {
    lat: number;
    lon: number;
  }
  
  interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  export interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: ListItem[];
    city: City;
  }