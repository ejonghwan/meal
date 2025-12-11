"use client"

import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';


interface MarkerRes {
    markerId: number;
    latitude: number;
    longitude: number;
    address?: string;
}

interface MarkerGroup {
    centerLatitude: number;
    centerLongitude: number;
    count: number;
}

interface CreateMarkerOption {
    image?: "pending" | "active" | "selected";
    position?: any;
    markerId?: string | number;
}

interface CreateMarker {
    options: CreateMarkerOption;
    map: any;
}


interface ReloadMarkersOprion {
    maxLevel: number;
    selectId?: number;
}

interface ReloadMarkers {
    options: ReloadMarkersOprion;
    map: any;
}

const haversineDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};



export const findNearbyMarkers = ({
    markers,
    latitude,
    longitude,
    maxDistance,
}: {
    markers: MarkerRes[];
    latitude: number;
    longitude: number;
    maxDistance: number;
}): MarkerRes[] => {
    return markers.filter((marker) => {
        const distance = haversineDistance(
            latitude,
            longitude,
            marker.latitude,
            marker.longitude
        );
        return distance <= maxDistance;
    });
};


const getDistance = (level: number) => {
    switch (true) {
        case level <= 3:
            return 1;
        case level <= 5:
            return 2;
        case level <= 6:
            return 4;
        case level <= 7:
            return 7;
        case level <= 8:
            return 14;
        case level <= 9:
            return 21;
        case level <= 10:
            return 30;
        case level <= 11:
            return 40;
        default:
            return 120;
    }
};

const getCellSize = (level: number) => {
    switch (true) {
        case level === 6:
            return 0.02;
        case level === 7:
            return 0.04;
        case level === 8:
            return 0.08;
        case level === 9:
            return 0.2;
        case level === 10:
            return 0.5;
        case level === 11:
            return 0.8;
        default:
            return 1.6;
    }
};


const useMarkerControl = () => {
    const [marker, setMarkers] = useState(null)
    const [overlays, setOverlays] = useState(null)

    const getGridCoordinates = (
        lat: number,
        lng: number,
        cellSize: number
    ): { x: number; y: number } => {
        const x = Math.floor(lng / cellSize);
        const y = Math.floor(lat / cellSize);
        return { x, y };
    };

    export const clusterMarkers = (
        markers: MarkerRes[],
        cellSize: number
    ): MarkerGroup[] => {
        const groups: { [key: string]: MarkerGroup } = {};

        markers.forEach((marker) => {
            const { x, y } = getGridCoordinates(
                marker.latitude,
                marker.longitude,
                cellSize
            );
            const key = `${x},${y}`;

            if (!groups[key]) {
                groups[key] = { centerLatitude: 0, centerLongitude: 0, count: 0 };
            }

            groups[key].centerLatitude += marker.latitude;
            groups[key].centerLongitude += marker.longitude;
            groups[key].count += 1;
        });

        return Object.values(groups).map((group) => ({
            centerLatitude: group.centerLatitude / group.count,
            centerLongitude: group.centerLongitude / group.count,
            count: group.count,
        }));
    };


    // #######
    const createMarker = ({ options, map }: CreateMarker) => {
        const imageSize = new window.kakao.maps.Size(44, 49);
        const imageOption = { offset: new window.kakao.maps.Point(21, 39) };

        const imageUrl =
            options.image === "selected"
                ? "/pin-selected.svg"
                : "/pin-active.svg";

        const pin = new window.kakao.maps.MarkerImage(
            imageUrl,
            imageSize,
            imageOption
        );

        const marker = new window.kakao.maps.Marker({
            map: map,
            position: options.position,
            image: pin,
        });

        setMarkers([marker]);
    };

    // #########
    const createOverlay = ({ map, options }: CreateOverlay) => {
        const overlayDiv = document.createElement("div");
        const root = createRoot(overlayDiv);

        const overlay = new window.kakao.maps.CustomOverlay({
            position: options.position,
            content: overlayDiv,
            clickable: true,
        });

        // Overlay 컴포넌트는 따로 만들어 줘야 합니다.
        root.render(<Overlay title={ options.title } position = { options.position } />);

        overlay.setMap(map);

        setOverlays(overlay);
    };




    // ########
    const reloadMarkers = ({ map, options }: ReloadMarkers) => {
        // 지도에 표시된 모든 마커 삭제 함수 (상태 null로)
        // deleteAllMarker();
        // 지도에 표시된 모든 오버레이 삭제 함수 (상태 null로)
        // deleteOverlays();

        const position = map.getCenter();
        const level = map.getLevel();

        const distance = getDistance(level);

        const nearbyMarker = findNearbyMarkers({
            markers: marker,
            latitude: position.getLat(),
            longitude: position.getLng(),
            maxDistance: distance,
        });

        if (level >= options.maxLevel) {
            const group = clusterMarkers(nearbyMarker, getCellSize(level));
            for (let i = 0; i < group.length; i++) {
                createOverlay({
                    map,
                    options: {
                        position: new window.kakao.maps.LatLng(
                            group[i].centerLatitude,
                            group[i].centerLongitude
                        ),
                        title: `${group[i].count} 개`,
                    },
                });
            }
        } else {
            for (let i = 0; i < nearbyMarker.length; i++) {
                if (options.selectId) {
                    let image: "pending" | "active" | "selected";
                    if (nearbyMarker[i].markerId === options.selectId) {
                        image = "selected";
                    } else {
                        image = "active";
                    }
                    createMarker({
                        map,
                        options: {
                            image: image,
                            markerId: nearbyMarker[i].markerId,
                            position: new window.kakao.maps.LatLng(
                                nearbyMarker[i].latitude,
                                nearbyMarker[i].longitude
                            ),
                        },
                    });
                } else {
                    createMarker({
                        map,
                        options: {
                            image: "active",
                            markerId: nearbyMarker[i].markerId,
                            position: new window.kakao.maps.LatLng(
                                nearbyMarker[i].latitude,
                                nearbyMarker[i].longitude
                            ),
                        },
                    });
                }
            }
        }
    };

    return { createMarker, createOverlay, reloadMarkers };
};


export default useMarkerControl;