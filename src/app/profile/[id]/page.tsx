export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>
        Profile Page of {" "}
        <span className="p-1 ml-1 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </h1>
    </div>
  );
}
