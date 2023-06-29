const { Thought, User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .populate('friends', '-__v') 
        .exec();
  
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  ,

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('friends')
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ username: user.username });
      res.json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  ,
  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  ,
};
