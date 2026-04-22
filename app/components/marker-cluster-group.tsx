"use client";

import {
  createElementObject,
  createLayerComponent,
  extendContext,
  type LayerProps,
} from "@react-leaflet/core";
import L from "leaflet";
import type { ReactNode } from "react";

import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";

function clusterIconCreate(cluster: L.MarkerCluster): L.DivIcon {
  const n = cluster.getChildCount();
  const size = n < 10 ? 44 : n < 50 ? 48 : 52;
  const tier = n < 10 ? "sm" : n < 50 ? "md" : "lg";
  return L.divIcon({
    html: `<div class="mt-cluster mt-cluster--${tier}" style="width:${size}px;height:${size}px"><span class="mt-cluster__count">${n}</span></div>`,
    className: "mt-cluster-anchor",
    iconSize: L.point(size, size),
  });
}

const defaultClusterOptions: L.MarkerClusterGroupOptions = {
  maxClusterRadius: 64,
  showCoverageOnHover: false,
  spiderfyOnMaxZoom: true,
  zoomToBoundsOnClick: true,
  animate: true,
  chunkedLoading: true,
  iconCreateFunction: clusterIconCreate,
  spiderLegPolylineOptions: { weight: 1.5, color: "#0891b2", opacity: 0.35 },
};

export interface MarkerClusterGroupProps extends LayerProps, L.MarkerClusterGroupOptions {
  children?: ReactNode;
}

export const MarkerClusterGroup = createLayerComponent(function createMarkerClusterGroup(
  { children: _children, ...options }: MarkerClusterGroupProps,
  context,
) {
  const merged: L.MarkerClusterGroupOptions = {
    ...defaultClusterOptions,
    ...options,
    iconCreateFunction: options.iconCreateFunction ?? defaultClusterOptions.iconCreateFunction,
  };
  const group = L.markerClusterGroup(merged);
  return createElementObject(group, extendContext(context, { layerContainer: group }));
});
