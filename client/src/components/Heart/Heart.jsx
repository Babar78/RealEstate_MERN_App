import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/userDetailsContext";
import { checkFavourites, updateFavorites } from "../../utils/common";
import { addToFav } from "../../utils/api";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { favourites },
    setUserDetails,
  } = useContext(UserDetailContext);


  useEffect(()=>{
    setHeartColor(()=>checkFavourites(id,favourites))
  },[favourites])

  const { mutate } = useMutation({
    mutationFn: () => addToFav(id, user?.email),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavorites(id, prev.favourites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
