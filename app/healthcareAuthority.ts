type Coordinates = {
  latitude: number;
  longitude: number;
};

export type HealthcareAuthority = {
  name: string;
  bounds: {
    ne: Coordinates;
    sw: Coordinates;
  };
  org_id: string;
  cursor_url: string;
  public_api: string;
  internal_id: string;
};
