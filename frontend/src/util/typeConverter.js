export const buildingTypeConverter = (type) => {
    switch (type) {
        case "APARTMENT":
            return "아파트"
        case "SMALL_APARTMENT":
            return "빌라"
        case "HOUSE":
            return "주택"
        default:
            return "아파트";
    }
}