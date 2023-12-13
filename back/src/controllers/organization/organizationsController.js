import DB from '../../db/configDB.js';
import organizationSchemas from '../../schemas/organizationSchema.js';

const {
  CreateOrganizationSchema,
  UpdateOrganizationSchema,
  DeleteOrganizationSchema
} = organizationSchemas;

const createOrganization = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      description,
      city,
      avatar,
      cif
    } = CreateOrganizationSchema.parse(req.body);

    const avatarValue = avatar || null;

    const dbInfo = await DB.sendQuery(
      DB.query.createOrganization,
      [
        name,
        email,
        password,
        description,
        city,
        avatarValue,
        cif
      ]
    );

    res.status(201).json({ ...req.body, id: dbInfo.insertId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const allOrganizations = await DB.sendQuery(DB.query.getAllOrganizations);
    res.status(200).json(allOrganizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const [organization] = await DB.sendQuery(DB.query.getOrganizationById, [id]);
    if (organization) {
      res.status(200).json(organization);
    } else {
      res.status(404).json({ message: 'Organization not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      description,
      city,
      avatar,
      cif
    } = UpdateOrganizationSchema.parse(req.body);

    const dbInfo = await DB.sendQuery(DB.query.updateOrganization, [
      name,
      email,
      password,
      description,
      city,
      avatar,
      cif,
      id
    ]);

    if (dbInfo.affectedRows !== 0) {
      res.status(200).json({ message: `Organization ${id} updated successfully` });
    } else {
      res.status(404).json({ message: 'Organization not found or no changes applied' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const { id } = DeleteOrganizationSchema.parse(req.body);
    await DB.sendQuery(DB.query.deleteOrganization, [id]);
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export default {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
};
