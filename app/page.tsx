"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Brain, Trophy, BarChart3, Clock, Menu, XIcon } from "lucide-react"

// Quiz data structure
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
    correctAnswer: 2,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
  },
]

// Navbar component with functional dropdowns and modals
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // Close dropdowns when clicking outside
  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Brain className="h-8 w-8 text-purple-300" />
                  <span className="ml-2 text-white font-bold text-xl">QuizMaster Pro</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => setActiveModal("dashboard")}
                    className="bg-purple-800 bg-opacity-50 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveModal("categories")}
                    className="text-purple-200 hover:bg-purple-700 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Categories
                  </button>
                  <button
                    onClick={() => setActiveModal("leaderboard")}
                    className="text-purple-200 hover:bg-purple-700 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Leaderboard
                  </button>
                  <button
                    onClick={() => setActiveModal("settings")}
                    className="text-purple-200 hover:bg-purple-700 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="bg-purple-600 p-1 rounded-full text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  {/* Notifications dropdown */}
                  {isNotificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-700">
                          <h3 className="text-sm font-medium text-white">Notifications</h3>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                            <p className="text-sm text-white">New quiz challenge available!</p>
                            <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                            <p className="text-sm text-white">Your friend beat your high score</p>
                            <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                            <p className="text-sm text-white">Weekly quiz competition starts tomorrow</p>
                            <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                          </div>
                        </div>
                        <div className="px-4 py-2 border-t border-gray-700">
                          <button className="text-xs text-purple-400 hover:text-purple-300">Mark all as read</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ml-3 relative" ref={userMenuRef}>
                  <div>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="max-w-xs bg-purple-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        U
                      </div>
                    </button>
                  </div>

                  {/* User menu dropdown */}
                  {isUserMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            setActiveModal("profile")
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                        >
                          Your Profile
                        </button>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            setActiveModal("account")
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                        >
                          Account Settings
                        </button>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            alert("You've been signed out!")
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-purple-800 inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-900">
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveModal("dashboard")
                }}
                className="block w-full text-left bg-purple-800 text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveModal("categories")
                }}
                className="block w-full text-left text-purple-200 hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Categories
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveModal("leaderboard")
                }}
                className="block w-full text-left text-purple-200 hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Leaderboard
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveModal("settings")
                }}
                className="block w-full text-left text-purple-200 hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveModal("profile")
                }}
                className="block w-full text-left text-purple-200 hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Your Profile
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  alert("You've been signed out!")
                }}
                className="block w-full text-left text-purple-200 hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal components */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setActiveModal(null)}
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    {activeModal === "dashboard" && (
                      <>
                        <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                          Dashboard
                        </h3>
                        <div className="mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h4 className="font-medium text-purple-300">Quiz Stats</h4>
                              <p className="text-2xl font-bold text-white mt-2">24</p>
                              <p className="text-sm text-gray-400">Quizzes completed</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h4 className="font-medium text-purple-300">Accuracy</h4>
                              <p className="text-2xl font-bold text-white mt-2">78%</p>
                              <p className="text-sm text-gray-400">Average score</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h4 className="font-medium text-purple-300">Rank</h4>
                              <p className="text-2xl font-bold text-white mt-2">#42</p>
                              <p className="text-sm text-gray-400">Global position</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <h4 className="font-medium text-purple-300">Streak</h4>
                              <p className="text-2xl font-bold text-white mt-2">5</p>
                              <p className="text-sm text-gray-400">Days in a row</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeModal === "categories" && (
                      <>
                        <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                          Quiz Categories
                        </h3>
                        <div className="mt-4 space-y-3">
                          <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                <span className="text-white font-bold">H</span>
                              </div>
                              <div>
                                <p className="font-medium text-white">History</p>
                                <p className="text-xs text-gray-400">12 quizzes available</p>
                              </div>
                            </div>
                            <span className="text-purple-400">Play</span>
                          </button>

                          <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                                <span className="text-white font-bold">S</span>
                              </div>
                              <div>
                                <p className="font-medium text-white">Science</p>
                                <p className="text-xs text-gray-400">18 quizzes available</p>
                              </div>
                            </div>
                            <span className="text-purple-400">Play</span>
                          </button>

                          <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                                <span className="text-white font-bold">G</span>
                              </div>
                              <div>
                                <p className="font-medium text-white">Geography</p>
                                <p className="text-xs text-gray-400">9 quizzes available</p>
                              </div>
                            </div>
                            <span className="text-purple-400">Play</span>
                          </button>

                          <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-3">
                                <span className="text-white font-bold">E</span>
                              </div>
                              <div>
                                <p className="font-medium text-white">Entertainment</p>
                                <p className="text-xs text-gray-400">15 quizzes available</p>
                              </div>
                            </div>
                            <span className="text-purple-400">Play</span>
                          </button>
                        </div>
                      </>
                    )}

                    {activeModal === "leaderboard" && (
                      <>
                        <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                          Global Leaderboard
                        </h3>
                        <div className="mt-4">
                          <div className="flex justify-between items-center p-2 border-b border-gray-700 text-sm text-gray-400">
                            <span>Rank</span>
                            <span>Player</span>
                            <span>Score</span>
                          </div>
                          <div className="space-y-2 mt-2">
                            <div className="flex justify-between items-center p-2 bg-purple-900/30 rounded-lg">
                              <span className="font-bold text-yellow-400">#1</span>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 flex items-center justify-center mr-2">
                                  <span className="text-white font-bold text-xs">A</span>
                                </div>
                                <span className="text-white">AlexMaster</span>
                              </div>
                              <span className="font-bold text-white">9,845</span>
                            </div>

                            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-lg">
                              <span className="font-bold text-gray-300">#2</span>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-300 flex items-center justify-center mr-2">
                                  <span className="text-white font-bold text-xs">Q</span>
                                </div>
                                <span className="text-white">QuizWizard</span>
                              </div>
                              <span className="font-bold text-white">9,312</span>
                            </div>

                            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-lg">
                              <span className="font-bold text-amber-700">#3</span>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 flex items-center justify-center mr-2">
                                  <span className="text-white font-bold text-xs">B</span>
                                </div>
                                <span className="text-white">BrainiacPro</span>
                              </div>
                              <span className="font-bold text-white">8,954</span>
                            </div>

                            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-lg">
                              <span className="font-bold text-gray-400">#4</span>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-500 flex items-center justify-center mr-2">
                                  <span className="text-white font-bold text-xs">T</span>
                                </div>
                                <span className="text-white">TriviaKing</span>
                              </div>
                              <span className="font-bold text-white">8,721</span>
                            </div>

                            <div className="flex justify-between items-center p-2 bg-purple-700/30 rounded-lg border border-purple-500/30">
                              <span className="font-bold text-purple-400">#42</span>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-2">
                                  <span className="text-white font-bold text-xs">U</span>
                                </div>
                                <span className="text-white">You</span>
                              </div>
                              <span className="font-bold text-white">3,487</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeModal === "settings" && (
                      <>
                        <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                          Settings
                        </h3>
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300">Theme</label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                              <option>Dark (Default)</option>
                              <option>Light</option>
                              <option>System</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300">Difficulty</label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                              <option>Easy</option>
                              <option>Medium</option>
                              <option selected>Hard</option>
                              <option>Expert</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300">Sound Effects</label>
                            <div className="mt-1">
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                  defaultChecked
                                />
                                <span className="ml-2 text-white">Enabled</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300">Timer Duration</label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                              <option>15 seconds</option>
                              <option selected>30 seconds</option>
                              <option>45 seconds</option>
                              <option>60 seconds</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {activeModal === "profile" && (
                      <>
                        <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                          Your Profile
                        </h3>
                        <div className="mt-4">
                          <div className="flex flex-col items-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-2">
                              U
                            </div>
                            <h4 className="text-xl font-bold text-white">User123</h4>
                            <p className="text-sm text-gray-400">Joined April 2023</p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300">Display Name</label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                defaultValue="User123"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300">Email</label>
                              <input
                                type="email"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                defaultValue="user@example.com"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300">Bio</label>
                              <textarea
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                rows={3}
                                defaultValue="Quiz enthusiast and knowledge seeker."
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeModal === "account" && (
                      <>
                        <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                          Account Settings
                        </h3>
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300">Change Password</label>
                            <input
                              type="password"
                              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Current password"
                            />
                            <input
                              type="password"
                              className="mt-2 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                              placeholder="New password"
                            />
                            <input
                              type="password"
                              className="mt-2 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                              placeholder="Confirm new password"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300">Notification Preferences</label>
                            <div className="mt-2 space-y-2">
                              <label className="inline-flex items-center w-full">
                                <input
                                  type="checkbox"
                                  className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                  defaultChecked
                                />
                                <span className="ml-2 text-white">Quiz reminders</span>
                              </label>
                              <label className="inline-flex items-center w-full">
                                <input
                                  type="checkbox"
                                  className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                  defaultChecked
                                />
                                <span className="ml-2 text-white">New quiz notifications</span>
                              </label>
                              <label className="inline-flex items-center w-full">
                                <input
                                  type="checkbox"
                                  className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                  defaultChecked
                                />
                                <span className="ml-2 text-white">Leaderboard updates</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300">Privacy Settings</label>
                            <div className="mt-2 space-y-2">
                              <label className="inline-flex items-center w-full">
                                <input
                                  type="checkbox"
                                  className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                  defaultChecked
                                />
                                <span className="ml-2 text-white">Show my profile publicly</span>
                              </label>
                              <label className="inline-flex items-center w-full">
                                <input
                                  type="checkbox"
                                  className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-white">Show my scores on leaderboards</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                {(activeModal === "profile" || activeModal === "account" || activeModal === "settings") && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal(null)
                      alert("Changes saved successfully!")
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return // Prevent multiple selections

    setSelectedOption(optionIndex)
    setShowFeedback(true)

    const correct = optionIndex === currentQuestion.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }

    // Move to next question after a delay
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedOption(null)

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setQuizCompleted(true)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setScore(0)
    setQuizCompleted(false)
    setShowFeedback(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900">
      <Navbar />

      <div className="pt-20 pb-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-purple-500/20"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-purple-800 p-1.5 rounded-lg">
                        <BarChart3 className="w-4 h-4 text-purple-200" />
                      </div>
                      <h2 className="text-sm font-medium text-purple-200">
                        Question {currentQuestionIndex + 1} of {quizQuestions.length}
                      </h2>
                    </div>
                    <div className="flex items-center space-x-2 bg-purple-800/50 px-3 py-1 rounded-full">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <div className="text-sm font-medium text-purple-100">Score: {score}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>
                  <h1 className="text-xl font-bold mb-6 text-white">{currentQuestion.question}</h1>
                </div>

                <div className="space-y-3 relative z-10">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 
                        ${
                          selectedOption === index
                            ? index === currentQuestion.correctAnswer
                              ? "bg-green-900/50 border-green-500 text-green-100"
                              : "bg-red-900/50 border-red-500 text-red-100"
                            : selectedOption !== null && index === currentQuestion.correctAnswer
                              ? "bg-green-900/50 border-green-500 text-green-100"
                              : "border-gray-700 text-gray-100 hover:bg-gray-700/50"
                        }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs font-bold
                          ${
                            selectedOption === index
                              ? index === currentQuestion.correctAnswer
                                ? "bg-green-500 text-green-100"
                                : "bg-red-500 text-red-100"
                              : selectedOption !== null && index === currentQuestion.correctAnswer
                                ? "bg-green-500 text-green-100"
                                : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-lg ${isCorrect ? "bg-green-900/30 border border-green-500/50" : "bg-red-900/30 border border-red-500/50"} flex items-center`}
                  >
                    {isCorrect ? (
                      <>
                        <div className="bg-green-500 rounded-full p-1 mr-3">
                          <Check className="w-4 h-4 text-green-100" />
                        </div>
                        <span className="font-medium text-green-100">Correct!</span>
                      </>
                    ) : (
                      <>
                        <div className="bg-red-500 rounded-full p-1 mr-3">
                          <X className="w-4 h-4 text-red-100" />
                        </div>
                        <span className="font-medium text-red-100">
                          Wrong! The correct answer is {currentQuestion.options[currentQuestion.correctAnswer]}
                        </span>
                      </>
                    )}
                  </motion.div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Time per question: 30s</span>
                  </div>
                  <div>Difficulty: Advanced</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 text-center border border-purple-500/20"
              >
                <div className="relative">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>

                  <div className="mb-4 relative z-10">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Trophy className="w-10 h-10 text-yellow-300" />
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold mb-6 text-white">Quiz Completed!</h1>

                  <div className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
                    {score} / {quizQuestions.length}
                  </div>

                  <div className="mb-8 px-6 py-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
                    <p className="text-lg text-purple-100">
                      {score === quizQuestions.length
                        ? "Perfect score! You're a certified genius!"
                        : score >= quizQuestions.length / 2
                          ? "Good job! Your knowledge is impressive."
                          : "Keep practicing! You'll improve with time."}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={restartQuiz}
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg shadow-purple-900/50"
                    >
                      Restart Quiz
                    </button>

                    <button className="w-full py-3 px-4 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors">
                      Share Results
                    </button>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between text-gray-400 text-sm">
                    <div>Time taken: 2:45</div>
                    <div>Accuracy: {Math.round((score / quizQuestions.length) * 100)}%</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
