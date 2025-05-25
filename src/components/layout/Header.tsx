"use client";

import Image from "next/image";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Header = () => {

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <Image src="/logo.png" alt="NOTED Logo" width={80} height={60} />
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 text-right max-[350px]:hidden">
          <div className="font-semibold">Khamonluck Ang.</div>
        </div>
        <EmojiEmotionsIcon className="text-[#ff8a34]" sx={{ fontSize: 36 }} />
      </div>
    </header>
  );
};

export default Header;
