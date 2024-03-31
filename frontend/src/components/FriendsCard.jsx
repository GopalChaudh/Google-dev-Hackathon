import React from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";

const FriendsCard = ({ friends }) => {
    return (
        <div>
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
                <div className='flex items-center justify-between text-primary pb-2 border-b border-gray-400'>
                    <span>Friends</span>
                    <span>{friends?.length}</span>
                </div>

                <div className='w-full flex flex-col gap-4 pt-4'>
                    {friends?.length > 0 ? (
                        friends.map((friend) => (
                            <Link
                                to={"/profile/" + friend?._id}
                                key={friend?._id}
                                className='w-full flex gap-4 items-center cursor-pointer'
                            >
                                <img
                                    src={friend?.profileUrl || NoProfile}
                                    alt={friend?.firstName + " " + friend?.lastName}
                                    className='w-10 h-10 object-cover rounded-full'
                                />
                                <div className='flex-1'>
                                    <p className='text-base font-medium text-primary'>
                                        {friend?.firstName} {friend?.lastName}
                                    </p>
                                    <span className='text-sm text-secondary'>
                                        {friend?.profession || 'No Profession'}
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-primary">No friends found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendsCard;
