export type ToastProps = {
  message: React.ReactNode;
  //message:string
};

export function Toast({ message }: ToastProps) {
  return (
    <div className="border border-orange-700 bg-orange-500 rounded-xl py-3 px-6 text-2xl text-white">
      {message}
    </div>
  );
}
