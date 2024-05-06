// 사용할 때는 너그럽게, 생성할 때는 엄격하게
import {Feature, Geometry} from "geojson";

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): Camera;
// declare function calculateBoundingBox(f: Feature): LngLatBounds ;

interface LngLat { lng: number; lat: number; }
type LngLatLike = LngLat | { lon: number; lat: number } | [ number, number ];

interface Camera {
    center: LngLat;
    zoom: number;
    bearing: number;
    pitch: number;
}

interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
    center?: LngLatLike;
}

type LngLatBounds = { northeast: LngLatLike, southwest: LngLatLike; } | [LngLatLike, LngLatLike] | [number, number, number, number];

// setCamera({ center: { lon: 1, lat: 0 } });

function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const { center: {lat, lng}, zoom } = camera;
    zoom;
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

interface BoundingBox {
}

function calculateBoundingBox(f: Feature): BoundingBox | null {
    let box: BoundingBox | null = null;
    const helper = (coords: any[]) => {
        // ...
    }

    const { geometry } = f;
    const geometryHelper = (g: Geometry) => {
        if(geometry.type === 'GeometryCollection'){
            geometry.geometries.forEach(geometryHelper);
        }
    }
    if(geometry){
        geometryHelper(geometry);
    }
    return box;
}

type AbsolutePath = string & {_brand: 'abs'};
function listAbsolutePath(path: AbsolutePath) {
    // ..
}
function isAbsolutePath(path: string): path is AbsolutePath {
    return path.startsWith('/');
}
function f(path: string) {
    if(isAbsolutePath(path)) {
        listAbsolutePath(path);
    }
    listAbsolutePath(path); // string은 AbsolutePath 형식의 매개변수에 할당될 수 없다.
}

type SortedList<T> = T[] & {_brand: 'sorted'};
function isSorted<T>(xs: T[]): xs is SortedList<T>{
    for (let i=1; i<xs.length; i++){
        if (xs[i] < xs[i-1]){
            return false;
        }
    }
    return true;
}
function binarySearch<T>(xs: SortedList<T>, x: T): boolean {
    let low = 0, high = xs.length - 1;
    while(high >= low){
        const mid = low + Math.floor((high - low) / 2);
        const v = xs[mid];
        if(v===x) return true;
        [low, high] = x > v ? [mid+1, high] : [low, mid -1];
    }
    return false;
}

type Meters = number & {_brand: 'meters'};
type Seconds = number & {_brand: 'seconds'};

const meter = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meter(1000);
const oneMin = seconds(60);

// 산술 연산 후에는 사라진다..
const tenKm = oneKm * 10; // number
