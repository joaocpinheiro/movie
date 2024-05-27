import { CiImageOff } from 'react-icons/ci'

export const CardSkeleton = ({ error }: { error?: boolean }) => {
  return (
    <div
      className={`h-[450px] md:h-[335px] w-full grid place-items-center bg-primary ${!error && 'cardSkeleton'}`}
    >
      {error && <CiImageOff size={56} />}
    </div>
  )
}
