const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export default function Loading() {
    return (
        <div
          className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
        >
          <div className="flex p-4">
            <div className="h-5 w-5 rounded-md bg-gray-200" />
          </div>
        </div>
    );
  }