import React from 'react'
import { useThemeStore } from '../store/useThemeStore.js'
import { THEMES } from '../constants'
import { Send } from 'lucide-react'

const PREVIEW_MESSAGES = [
  { id: 1, content: "Fuck You 2", isSent: false },
  { id: 2, content: "Fuck You 1", isSent: true },
]

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl ' >
      <div className='space-y-6 ' >
        <div className='flex flex-col gap-1 ' >
          <h2 className='text-lg font-semibold ' >
            Theme
          </h2>
          <p className='text-sm text-base-content/70 ' >
            Please select your chat theme by clicking on Available Themes button.
          </p>
        </div>

        {/* <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">Click</div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md">
            <div className="card-body">
              <p>This is a card. You can use any element as a dropdown.</p>
            </div>
          </div>
        </div> */}

        <div className="dropdown dropdown-right ">
          <div tabIndex={0} role="button" className="btn m-1 text-2xl font-bold  ">Available Themes</div>
          <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-72 p-2 shadow-sm">
            { THEMES.map((Theme)=>(
              <li className='text-lg font-bold text-base-content/70 border border-base-300/15 m-2 flex justify-center items-center ' >
                <button
                  key={Theme}
                  className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors 
                    ${ theme === Theme ? "bg-base-200" : "hover:bg-base-200/50" } 
                    `}
                  onClick={ () => setTheme(Theme) }
                >
                  { Theme } 
                  <div className='flex flex-row justify-evenly items-center w-fit gap-1' >
                    <div className="rounded bg-primary size-5 "></div>
                    <div className="rounded bg-secondary size-5 "></div>
                    <div className="rounded bg-accent size-5 "></div>
                    <div className="rounded bg-neutral size-5 "></div>
                  </div>
                </button>
              </li>
            )) }
          </ul>
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg" data-theme={theme}>
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SettingsPage
