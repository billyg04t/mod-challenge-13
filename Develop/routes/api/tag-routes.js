const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  // find all tags
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagged_products' }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  // find a single tag by its `id`
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
