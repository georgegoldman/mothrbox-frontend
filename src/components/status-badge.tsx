interface StatusBadgeProps {
  status: "successful" | "pending" | "cancelled"
  className?: string
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "successful":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
