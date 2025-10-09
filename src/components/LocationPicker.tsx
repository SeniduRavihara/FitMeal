import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AppText } from "./AppText";

interface LocationPickerProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  initialLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  placeholder?: string;
  disabled?: boolean;
}

export function LocationPicker({
  onLocationSelect,
  initialLocation,
  placeholder = "Select delivery location",
  disabled = false,
}: LocationPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: initialLocation?.latitude || 6.9271, // Colombo
    longitude: initialLocation?.longitude || 79.8612,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(
    initialLocation
      ? {
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          address: initialLocation.address || "",
        }
      : null
  );

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(initialLocation?.address || "");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Enable location permissions to use this feature"
        );
      }
    })();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedLocation({ ...coords, address: "" });
      setRegion({
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      const addressResult = await Location.reverseGeocodeAsync(coords);
      if (addressResult[0]) {
        const addr = addressResult[0];
        const fullAddress = `${addr.street || ""}, ${addr.city || ""}`.replace(
          /^,\s*|,\s*$/g,
          ""
        );
        setAddress(fullAddress);
      }
    } catch (error) {
      Alert.alert("Error", "Could not get location");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = async (e: any) => {
    const coords = e.nativeEvent.coordinate;
    setSelectedLocation(coords);

    try {
      const addressResult = await Location.reverseGeocodeAsync(coords);
      if (addressResult[0]) {
        const addr = addressResult[0];
        const fullAddress = `${addr.street || ""}, ${addr.city || ""}`.replace(
          /^,\s*|,\s*$/g,
          ""
        );
        setAddress(fullAddress);
      }
    } catch (error) {
      setAddress("Address not available");
    }
  };

  const confirmLocation = () => {
    if (selectedLocation) {
      const locationData = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        address: address,
      };

      onLocationSelect(locationData);
      setModalVisible(false);
    }
  };

  const openLocationPicker = () => {
    if (!disabled) {
      setModalVisible(true);
    }
  };

  return (
    <>
      {/* Location Selection Button */}
      <TouchableOpacity
        style={[
          styles.locationButton,
          disabled && styles.locationButtonDisabled,
        ]}
        onPress={openLocationPicker}
        disabled={disabled}
      >
        <Ionicons
          name="location-outline"
          size={20}
          color={disabled ? "#9CA3AF" : "#3B82F6"}
        />
        <View style={styles.locationTextContainer}>
          <AppText
            variant="body"
            weight="medium"
            color={disabled ? "secondary" : "primary"}
          >
            {selectedLocation ? "Location Selected" : placeholder}
          </AppText>
          {selectedLocation && address && (
            <AppText
              variant="caption"
              color="secondary"
              numberOfLines={2}
              style={{ marginTop: 2 }}
            >
              {address}
            </AppText>
          )}
        </View>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={disabled ? "#9CA3AF" : "#9CA3AF"}
        />
      </TouchableOpacity>

      {/* Location Picker Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <StatusBar barStyle="dark-content" />

          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
            <AppText variant="h3" weight="semibold" color="primary">
              Select Delivery Location
            </AppText>
            <TouchableOpacity
              onPress={getCurrentLocation}
              style={styles.currentLocationButton}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#3B82F6" size="small" />
              ) : (
                <Ionicons name="locate" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          </View>

          {/* Map */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={region}
              onPress={handleMapPress}
              showsUserLocation
              showsMyLocationButton={false}
            >
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Delivery Here 🍕"
                  description={address}
                  draggable
                  onDragEnd={handleMapPress}
                />
              )}
            </MapView>
          </View>

          {/* Bottom Sheet */}
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />

            <AppText
              variant="h3"
              weight="semibold"
              color="primary"
              style={styles.title}
            >
              🍔 Delivery Location
            </AppText>
            <AppText variant="body" color="secondary" style={styles.address}>
              {address || "Tap on map to select delivery location"}
            </AppText>

            {selectedLocation && (
              <View style={styles.infoBox}>
                <AppText variant="caption" color="primary" weight="medium">
                  📌 {selectedLocation.latitude.toFixed(4)},{" "}
                  {selectedLocation.longitude.toFixed(4)}
                </AppText>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.confirmBtn,
                !selectedLocation && styles.confirmBtnDisabled,
              ]}
              onPress={confirmLocation}
              disabled={!selectedLocation}
            >
              <AppText variant="body" weight="semibold" color="white">
                ✓ Confirm Location
              </AppText>
            </TouchableOpacity>

            <AppText variant="caption" color="secondary" style={styles.hint}>
              💡 Drag the marker to adjust position
            </AppText>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  locationButtonDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  closeButton: {
    padding: 4,
  },
  currentLocationButton: {
    padding: 8,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  address: {
    marginBottom: 12,
    lineHeight: 22,
  },
  infoBox: {
    backgroundColor: "#FFF4ED",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#FF6B35",
  },
  confirmBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  confirmBtnDisabled: {
    backgroundColor: "#DDD",
  },
  hint: {
    textAlign: "center",
    fontStyle: "italic",
  },
});
