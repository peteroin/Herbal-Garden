import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import PlantCard from "../components/ui/PlantCard";
import ProgressDisplay from "../components/ProgressDisplay";
import RecentActivityFeed from "../components/RecentActivityFeed";
import { AuthContext } from "../contexts/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { useProgress } from "../contexts/ProgressContext";
import { userAPI, gardenAPI, plannerAPI, careTrackerAPI } from "../lib/api";
import { Sprout, Pencil, Heart, Leaf } from "lucide-react";

export default function UserProfilePage() {
  const { user: authUser, logout } = useContext(AuthContext);
  const { favorites } = useFavorites();
  const { statistics, isLoading: progressLoading } = useProgress();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [garden, setGarden] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [careStats, setCareStats] = useState(null);

  // Load user profile from backend on mount and when authUser changes
  useEffect(() => {
    if (authUser) {
      fetchUserProfile();
      fetchGardenData();
    }
  }, [authUser]);

  const fetchGardenData = async () => {
    try {
      const gardenRes = await gardenAPI.getUserGarden().catch(() => null);
      const designsRes = await plannerAPI.getUserDesigns().catch(() => null);
      
      // Only fetch care statistics if garden exists
      let careRes = null;
      if (gardenRes?.data?._id) {
        careRes = await careTrackerAPI.getCareStatistics(gardenRes.data._id).catch(() => null);
      }

      if (gardenRes?.data) setGarden(gardenRes.data);
      if (designsRes?.data) setDesigns(Array.isArray(designsRes.data) ? designsRes.data : []);
      if (careRes?.data) setCareStats(careRes.data);
    } catch (err) {
      console.error("Failed to fetch garden data:", err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response) {
        const userData = {
          name: response.name || "",
          email: response.email || "",
          bio: response.bio || "",
          joinDate: response.createdAt || new Date().toISOString(),
          preferences: response.preferences || {},
        };
        setUser(userData);
        setEditForm(userData);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      // Fallback to authUser data if API fails
      const userData = {
        name: authUser?.name || "",
        email: authUser?.email || "",
        bio: authUser?.bio || "",
        joinDate: authUser?.createdAt || new Date().toISOString(),
        preferences: {},
      };
      setUser(userData);
      setEditForm(userData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await userAPI.updateProfile({
        name: editForm.name,
        bio: editForm.bio,
      });

      if (response && response.user) {
        setUser({
          ...editForm,
          joinDate: user.joinDate,
        });
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = [
    { label: "Favorite Plants", value: favorites.length },
    { label: "Learning Progress", value: `${statistics?.averageQuizScore || 0}%` },
    { label: "Quizzes Completed", value: statistics?.totalQuizzesCompleted || 0 },
    { label: "Plants Growing", value: garden?.plots?.filter(p => p.plantId)?.length || 0 },
    { label: "Garden Designs", value: designs.length },
    { label: "Care Activities", value: careStats?.totalActivities || 0 },
  ];

  if (!user) {
    return (
      <section className="section-shell py-20">
        <p className="text-center text-forest-600">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="section-shell py-20">
      <SectionHeading
        eyebrow="Personal Dashboard"
        title="Your Profile"
        copy="Manage your account, settings, and wellness journey."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-forest-400 to-clay-400 mx-auto mb-4">
              <span className="text-3xl font-bold text-white">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <h2 className="text-center text-2xl font-semibold text-forest-900">{user.name}</h2>
            <p className="mt-2 text-center text-sm text-forest-600">{user.email}</p>
            <p className="mt-3 text-center text-xs text-forest-500">
              Member since {new Date(user.joinDate).toLocaleDateString()}
            </p>
            {user.bio && <p className="mt-4 text-center text-sm text-forest-700">{user.bio}</p>}
            
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 w-full rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-700 transition disabled:opacity-50"
              disabled={isEditing || isLoading}
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="mt-3 w-full rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay-700">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-forest-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-forest-900 mb-8">My Favorite Plants</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.filter((plant) => plant).map((plant) => (
              <PlantCard key={plant._id || plant.id} plant={plant} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/favorites"
              className="inline-flex rounded-full bg-forest-600 px-6 py-2 font-semibold text-white hover:bg-forest-700 transition"
            >
              View All Favorites
            </Link>
          </div>
        </div>
      )}

      {/* Learning Dashboard Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold text-forest-900">Your Learning Dashboard</h3>
          <Link
            to="/dashboard"
            className="inline-flex rounded-full bg-forest-600 px-6 py-2 font-semibold text-white hover:bg-forest-700 transition"
          >
            View Full Dashboard →
          </Link>
        </div>
        <div className="space-y-8">
          <ProgressDisplay />
          <RecentActivityFeed />
        </div>
      </div>

      {/* My Garden Features Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-forest-900 mb-8">My Garden Features</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Virtual Garden Simulator */}
          <Link
            to="/my-garden"
            className="group glass-panel p-8 rounded-xl hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-center mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-forest-600">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-forest-900 group-hover:text-forest-700 transition">Virtual Garden</h4>
            <p className="text-sm text-forest-600 mt-2">Plant, water, and harvest herbs in your interactive garden plots.</p>
            <div className="mt-4 text-sm font-semibold text-forest-700">
              Plants Growing: {garden?.plots?.filter(p => p.plantId)?.length || 0}
            </div>
          </Link>

          {/* Garden Planner */}
          <Link
            to="/garden-planner"
            className="group glass-panel p-8 rounded-xl hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-center mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600">
              <Pencil className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-forest-900 group-hover:text-forest-700 transition">Garden Planner</h4>
            <p className="text-sm text-forest-600 mt-2">Design and layout your herbs with companion planting suggestions.</p>
            <div className="mt-4 text-sm font-semibold text-forest-700">
              Designs Created: {designs.length}
            </div>
          </Link>

          {/* Plant Care Tracker */}
          <Link
            to="/care-tracker"
            className="group glass-panel p-8 rounded-xl hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-center mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-rose-400 to-red-600">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-forest-900 group-hover:text-forest-700 transition">Care Tracker</h4>
            <p className="text-sm text-forest-600 mt-2">Log care activities and monitor the health of your plants.</p>
            <div className="mt-4 text-sm font-semibold text-forest-700">
              Care Activities: {careStats?.totalActivities || 0}
            </div>
          </Link>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="mt-12 glass-panel p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-forest-900 mb-6">Edit Profile</h3>

          {error && <p className="mb-4 text-sm font-medium text-red-600">{error}</p>}
          {message && <p className="mb-4 text-sm font-medium text-green-600">{message}</p>}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-forest-800 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2 text-forest-900 outline-none focus:border-forest-400"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-800 mb-2">Email</label>
              <input
                type="email"
                value={editForm.email}
                className="w-full rounded-lg border border-forest-200 bg-gray-50 px-4 py-2 text-forest-600 outline-none"
                disabled
              />
              <p className="mt-1 text-xs text-forest-500">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-800 mb-2">Bio</label>
              <textarea
                name="bio"
                value={editForm.bio || ""}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2 text-forest-900 outline-none focus:border-forest-400"
                placeholder="Tell us about your wellness journey..."
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-forest-500">{editForm.bio?.length || 0}/500</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 rounded-lg bg-forest-600 px-4 py-2 font-semibold text-white hover:bg-forest-700 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(user);
                  setError("");
                  setMessage("");
                }}
                className="flex-1 rounded-lg bg-forest-200 px-4 py-2 font-semibold text-forest-800 hover:bg-forest-300 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
        <Link
          to="/learning/quizzes"
          className="glass-panel p-6 text-center hover:bg-white/60 transition"
        >
          <p className="font-semibold text-forest-900">Quizzes</p>
          <p className="mt-1 text-sm text-forest-600">Test knowledge</p>
        </Link>

        <Link
          to="/learning"
          className="glass-panel p-6 text-center hover:bg-white/60 transition"
        >
          <p className="font-semibold text-forest-900">Learning</p>
          <p className="mt-1 text-sm text-forest-600">Explore resources</p>
        </Link>

        <Link
          to="/#garden"
          className="glass-panel p-6 text-center hover:bg-white/60 transition"
        >
          <p className="font-semibold text-forest-900">Garden</p>
          <p className="mt-1 text-sm text-forest-600">Discover plants</p>
        </Link>
      </div>
    </section>
  );
}
