export const createDate = (dt) => {
    const newDate = new Date(dt * 1000);
    return newDate.toDateString().slice(3);
}

export const createHour = (dt) => {
    const day = new Date(dt * 1000);
    return day.toLocaleString("en-us", { hour: "numeric" });
}

export const createDay = (dt) => {
    const day = new Date(dt * 1000);
    return day.toLocaleString("en-us", { weekday: "long" });
}