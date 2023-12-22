export function fullDatetimeFormat(date: string): string {
    if (!date || date === "") return ""

    return new Intl.DateTimeFormat('en-GB', {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    }).format(new Date(date)).replace(" at", "")
}