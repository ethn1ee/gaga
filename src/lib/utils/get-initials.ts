export const getInitials = (name: string) => {
	return name.split(" ").map((part) => part.charAt(0).toUpperCase())
}

