export type Coordinates = {
    latitude: number;
    longitude: number;
};
  
  /**
   * 現在地が指定された位置と半径内にあるかを判定する関数
   * @param targetLocation - 基準となる緯度・経度
   * @param radius - 半径 (km)
   * @returns Promise<boolean> - 範囲内であればtrue、範囲外であればfalse
   */
export const isWithinRadius = async (
    targetLocation: Coordinates,
    radius: number
): Promise<boolean> => {
    const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
      const R = 6371; // 地球の半径 (km)
      const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
      const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
      const lat1 = (coord1.latitude * Math.PI) / 180;
      const lat2 = (coord2.latitude * Math.PI) / 180;
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // 距離 (km)
    };
  
    const getCurrentLocation = (): Promise<Coordinates> =>
      new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          return reject(new Error("Geolocation APIがサポートされていません。"));
        }
  
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => reject(error)
        );
      });
  
    try {
      const userLocation = await getCurrentLocation();
      const distance = calculateDistance(userLocation, targetLocation);
      return distance <= radius;
    } catch (error) {
      console.error("位置情報の取得に失敗しました:", error);
      return false;
    }
};