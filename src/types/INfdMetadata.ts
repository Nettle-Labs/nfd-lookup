// Types
import INfdInternalMetadata from './INfdInternalMetadata';
import INfdVerifiedMetadata from './INfdVerifiedMetadata';

interface INfdMetadata {
  internal: INfdInternalMetadata;
  userDefined: Record<string, string>;
  verified: INfdVerifiedMetadata;
}

export default INfdMetadata;
