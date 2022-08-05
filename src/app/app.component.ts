import { Component, OnInit, NgZone, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    geoCoder: any;
    address: any;
    googleMapType: string = "";
    mapTypes : Array<string> = ["roadmap", "satellite","hybrid", "terrain"];
    isSnazzyWindowOpened: boolean = false;
    polygon: any;
    managerOptions = {
        drawingControl: true,
        drawingControlOptions: {
            drawingModes: ['polygon']
        },
        polygonOptions: {
            draggable: true,
            editable: true
        },
        drawingMode: "polygon"
    };
    latLongForm:FormGroup;

    constructor(
        private ngZone: NgZone,
        private fb: FormBuilder,
        @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
    ) {
        this.latLongForm = this.fb.group({
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
        });
    }
    ngOnInit(){
        
        this. getCurrentLocation();
        this.initialiseMapType();
        // this.mapsAPILoader.load().then(() => {
        //   this.setCurrentLocation();
        //   this.geoCoder = new google.maps.Geocoder;
        // });
    }

    options: any = {
        lat: 33.5362475,
        lng: -111.9267386,
        zoom: 10,
        fillColor: '#DC143C',
        draggable: true,
        editable: true,
        visible: true
    };
    // google maps zoom level
    zoom: number = 10;
  
    // initial center position for the map
    lat: number = 0;
    lng: number = 0;

    saveCoordinates () {

        
    }

    LocateLocation (latLng : any) {
        let distance = this.getDistanceFromLatLonInKm(this.lat, this.lng, latLng.latitude.toFixed(6), latLng.latitude.toFixed(5))
        this.markers.push({
            lat: latLng.latitude.toFixed(6),
            lng: latLng.latitude.toFixed(5),
            draggable: true,
            label: "",
            content: "Distance from Current Location is" + distance.toFixed(2),
            color: "blue",
            iconUrl:"http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png",
            distance: distance
            });

        this.lat = parseFloat(latLng.latitude);
        this.lng = parseFloat(latLng.longitude) ;
        console.log("Coordinates = ", latLng);
    }
    toggleSnazzyInfoWindow() {
        this.isSnazzyWindowOpened = !this.isSnazzyWindowOpened;
    }

    snazzyInfoWindowIsToggled($isOpen: boolean) {
        //console.log(`snazzyInfoWindowIsToggled ${$isOpen}`);
        // Keep isSnazzyInfoWindowOpened up-to-date (e.g. if window was closed on map click)
        this.isSnazzyWindowOpened = $isOpen;
        // Force detect changes.
        // Not necessarily needed. Depends on your projet
        // Here needed if window was closed on map click
        this.changeDetectorRef.detectChanges();
    }

    initialiseMapType() {
        this.googleMapType = "roadmap";
    }

    setMapType(param : string) {
        this.googleMapType = param;
    }
    // private setCurrentLocation() {
    //   if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.lat = position.coords.latitude;
    //       this.lng = position.coords.longitude;
    //       this.zoom = 8;
    //       this.getAddress(this.lat, this.lng);
    //     });
    //   }
    // }

    // getAddress(latitude: number, longitude: number) {
    //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results : any, status: any) => {
    //     if (status === 'OK') {
    //       if (results[0]) {
    //         this.zoom = 12;
    //         this.address = results[0].formatted_address;
    //       } else {
    //         window.alert('No results found');
    //       }
    //     } else {
    //       window.alert('Geocoder failed due to: ' + status);
    //     }
        
    //   });
    // }

    getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        let dLon = this.deg2rad(lon2 - lon1);
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
      }
      
      deg2rad(deg: number) {
        return deg * (Math.PI / 180)
      }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                console.log("Latitude = ", position.coords.latitude, "Logitude", position.coords.longitude);
            });
        }
        else {
            this.lat = 51.673858;
            this.lng = 7.815982;
            console.log("Geolocation is not supported by this browser.");
        }
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }
    
    mapClicked($event: any) {
        let distance = this.getDistanceFromLatLonInKm(this.lat, this.lng, $event.coords.lat.toFixed(6), $event.coords.lng.toFixed(5))
        this.markers.push({
        lat: $event.coords.lat.toFixed(6),
        lng: $event.coords.lng.toFixed(5),
        draggable: true,
        label: "",
        content: "Distance from Current Location is",
        color: "blue",
        iconUrl:"http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png",
        distance: distance
        });
        console.log("Lat and Long = ", this.markers);
    }
    
    markerDragEnd(m: marker, $event: any) {
        console.log('dragEnd', m, $event);
    }
    
    markers: marker[] = [
        // {
        //     lat: 18.509120588232037,
        //     lng: 73.87123330439609,
        //     label: 'A',
        //     draggable: true,
        //     content: "Information Content",
        //     color: "blue",
        //     iconUrl:"http://maps.google.com/mapfiles/ms/micons/gas.png",
        //     distance: 0
        // },
        // {
        //     lat: 18.722556712729133,
        //     lng: 74.19807656611484,
        //     label: 'B',
        //     draggable: true,
        //     content: "Information Content",
        //     color: "blue",
        //     iconUrl:"http://maps.google.com/mapfiles/ms/micons/dollar.png",
        //     distance: 0
        // },
        // {
        //     lat: 18.739055728431342,
        //     lng: 73.40311599021025,
        //     label: 'A',
        //     draggable: true,
        //     content: "Information Content",
        //     color: "blue",
        //     iconUrl:"http://maps.google.com/mapfiles/ms/micons/police.png",
        //     distance: 0
        // }
        ]

    //polygon creation

    polygonCreated($event: any) {

        if (this.polygon) {
        this.polygon.setMap(null);
        }
        this.polygon = $event;
        this.addPolygonChangeEvent(this.polygon);
        google.maps.event.addListener(this.polygon, 'coordinates_changed', function (index, obj) {
        // Polygon object: yourPolygon
        console.log('coordinates_changed');
        });

    }

    getPaths() {
        console.log("get path");
        if (this.polygon) {
        const vertices = this.polygon.getPaths().getArray()[0];
        let paths: string[] = [];
        vertices.getArray().forEach(function (xy: { lat: () => any; lng: () => any; }, i: any) {
            // console.log(xy);
            let latLng = {
            lat: xy.lat(),
            lng: xy.lng()
            };
            paths.push(JSON.stringify(latLng));
        });
        return paths;
        }
        return [];
    }

    addPolygonChangeEvent(polygon: any) {
        var me = polygon,
        isBeingDragged = false,
        triggerCoordinatesChanged = function () {
            // Broadcast normalized event
            google.maps.event.trigger(me, 'coordinates_changed');
        };

        // If  the overlay is being dragged, set_at gets called repeatedly,
        // so either we can debounce that or igore while dragging,
        // ignoring is more efficient
        google.maps.event.addListener(me, 'dragstart', function () {
        isBeingDragged = true;
        });

        // If the overlay is dragged
        google.maps.event.addListener(me, 'dragend', function () {
        triggerCoordinatesChanged();
        isBeingDragged = false;
        });

        // Or vertices are added to any of the possible paths, or deleted
        var paths = me.getPaths();
        paths.forEach(function (path: object, i: any) {
        google.maps.event.addListener(path, "insert_at", function () {
            triggerCoordinatesChanged();
        });
        google.maps.event.addListener(path, "set_at", function () {
            if (!isBeingDragged) {
            triggerCoordinatesChanged();
            }
        });
        google.maps.event.addListener(path, "remove_at", function () {
            triggerCoordinatesChanged();
        });
        });
    };
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label: string
	draggable: boolean;
    content: string;
    color: string;
    iconUrl: string;
    distance: number;
}


