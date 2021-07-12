export function MainCard() {
  return (
    <main>
      <div className="flex">
        {/* 왼쪽 이미지 영역 */}
        <div className="flex-none w-48 relative">
          <img
            src="https://user-images.githubusercontent.com/68647194/125168170-056e3f80-e1df-11eb-8af8-de5395e38480.JPG"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* 오른쪽 내용 영역 */}
        <form className="flex-auto p-6 space-y-4">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-xl font-semibold">Readable</h1>
            <div className="text-xl font-semibold text-gray-500">Save</div>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">chrome://extensions/</div>
          </div>
          {/* 카테고리 선택 영역 */}
          <div>
            <div className="mt-1 relative">
              <button
                type="button"
                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
              >
                <span className="flex items-center">
                  {/* <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  /> */}
                  <span className="ml-3 block truncate">Favorites</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              {/* <ul
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                tabIndex={-1}
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                <li
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                  id="listbox-option-0"
                  role="option"
                >
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />

                    <span className="font-normal ml-3 block truncate">
                      Wade Cooper
                    </span>
                  </div>

                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </li>
              </ul> */}
            </div>
          </div>
          {/* 태그 입력 영역 */}
          <div className="flex">
            <input
              className="border-b-2 w-full"
              placeholder="Input..."
              onChange={() => {
                const test = 1;
              }}
            />
          </div>
          {/* 해시태그 영역 */}
          <div className="flex space-x-2 mb-4 text-sm font-medium">
            <div className="rounded-full py-1 px-2 bg-yellow-200 text-black text-xs">#dev</div>
            <div className="rounded-full py-1 px-2 bg-purple-600 text-white text-xs">#life</div>
            <div className="rounded-full py-1 px-2 bg-green-300 text-black text-xs">#study</div>
            <div className="rounded-full py-1 px-2 bg-blue-600 text-white text-xs">#blog</div>
            <div className="rounded-full py-1 px-2 bg-indigo-300 text-black text-xs">#favorites</div>
            {/* <div className="flex-auto flex space-x-3">
              <button
                className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
                type="submit"
              >
                Buy now
              </button>
              <button
                className="w-1/2 flex items-center justify-center rounded-md border border-gray-300"
                type="button"
              >
                Add to bag
              </button>
            </div>
            <button
              className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300"
              type="button"
              aria-label="like"
            >
              <svg width="20" height="20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </button> */}
          </div>
          {/* <p className="text-sm text-gray-500">
            Free shipping on all continental US orders.
          </p> */}
        </form>
      </div>
    </main>
  );
}

export default MainCard;
