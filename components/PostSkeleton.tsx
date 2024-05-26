import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonPost() {
  return (
    <div className="flex flex-col space-y-3 bg-white p-4 rounded-md">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px] ml-auto" />
      </div>
    </div>
  )
}
