export type ToastProps = {
    // message: React.ReactNode;
    message:string
  };
  
  export function Toast({ message }: ToastProps) {
    return (
      <div className="border-orange-700 bg-orange-500 rounded-xl py-1 px-3">
        {message}
      </div>
    );
  }