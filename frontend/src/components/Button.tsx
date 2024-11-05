import { ThreeDots } from "react-loader-spinner";

const Button = ({
  isLoading,
  onClick,
}: {
  isLoading: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="bg-secondary text-black font-medium h-12 rounded-md flex justify-center items-center">
      {isLoading ? (
        <ThreeDots
          visible={true}
          height="50"
          width="30"
          color="black"
          radius="10"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <button
          className="w-full h-full justify-center items-center"
          onClick={onClick}
        >
          Signup
        </button>
      )}
    </div>
  );
};

export default Button;
