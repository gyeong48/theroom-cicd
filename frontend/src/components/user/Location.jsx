import React, { useEffect } from 'react'
import MapInnerButton from './MapInnerButton';

const { kakao } = window;

function Location({ location }) {
    let map;
    let marker;
    const { latitude, longitude } = location;

    useEffect(() => {
        const mapContainer = document.getElementById('map')
        const mapOption = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3
        };

        map = new kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        marker = new kakao.maps.Marker({
            position: markerPosition
        });

        marker.setMap(map);
    }, [])

    const handleZoomInClick = () => {
        const level = map.getLevel();
        map.setLevel(level - 1);
    }

    const handleZoomOutClick = () => {
        const level = map.getLevel();
        map.setLevel(level + 1);
    }

    const handleRefreshClick = () => {
        const center = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(center);
        map.setLevel(3);
    }

    return (
        <div className='relative'>
            <div id="map" style={{ width: "100%", height: "350px" }}></div>
            <div className='absolute top-1/3 right-1 z-50'>
                <MapInnerButton image={"plus.png"} onClick={handleZoomInClick} />
                <MapInnerButton image={"minus.png"} onClick={handleZoomOutClick} />
                <MapInnerButton image={"refresh.png"} onClick={handleRefreshClick} />
            </div>
        </div>
    )
}

export default Location